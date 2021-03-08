<?php

namespace App\Http\Controllers;

use App\Events\WSPrivateChat;
use App\Models\Messager;
use App\Transformers\MessageTransformer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessagerController extends Controller
{
    /**
     * @var: App\Transformers\MessageTransformer
     */
    protected $message_transformer;

    public function __construct(MessageTransformer $message_transformer)
    {
        $this->message_transformer = $message_transformer;
    }

    /**
     * @decription: Get user chat.
     * @author: Cristono Wijaya
     * @param: numeric $id
     * @return: \Illuminate\Http\Response
     * @http: GET
     */
    public function userChat($id) 
    {
        try 
        {
            $current_user = Auth::user();
            $private_messages = $current_user->get_private_messages($id);
            $private_messages->transform(function ($messager) {
                return $this->message_transformer->transform($messager);
            });
            $this->setStatusCode(Response::HTTP_OK);
            return $this->respond($private_messages);    
            
        }
        catch(\Exception $e) 
        {
            $this->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $this->respond($e);
        }
    }

    /**
     * @description: Send user message
     * @author: Cristono Wijaya
     * @param: \Illuminate\Http\Request $request
     * @return: \Illuminate\Http\Response
     * @http: POST
     */
    public function sending(Request $request) 
    {
        try 
        {
            DB::beginTransaction();
            $current_user = Auth::user();
            $messager = new Messager();
            $messager->sender = $current_user->id;
            $messager->receiver = $request->user_id;
            $messager->content = $request->content;
            $messager->save();
            DB::commit();
            broadcast(new WSPrivateChat($messager));
            $this->setStatusCode(Response::HTTP_CREATED);
            return $this->respond($this->message_transformer->transform($messager));
        }
        catch(\Exception $e) 
        {
            $this->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $this->respond("Error");
        }
    }
}