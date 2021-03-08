<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @var: App\Transformers\UserTransformer
     */
    protected $user_transformer;

    public function __construct(UserTransformer $user_transformer)
    {
        $this->user_transformer = $user_transformer;
    }

    /**
     * @decription: Login user.
     * @author: Cristono Wijaya
     * @param: \Illuminate\Http\Request $request
     * @return: \Illuminate\Http\Response
     * @http: POST
     */
    public function login(Request $request) 
    {
        try
        {
            if(!Auth::attempt($request->all())) {
                $this->setStatusCode(Response::HTTP_BAD_REQUEST);    
                return $this->respond(['message' => 'login failed please check password or email']);
            }
            $access_token = Auth::user()->createToken('authToken')->accessToken;
            $this->setStatusCode(Response::HTTP_OK);
            return $this->respond(['access_token' => $access_token ]);
        }
        catch(\Exception $e) 
        {
            dd($e);
            $this->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $this->respond("Error");
        }
    }

    /**
     * @decription: Register user.
     * @author: Cristono Wijaya
     * @param: \Illuminate\Http\Request $request
     * @return: \Illuminate\Http\Response
     * @http: POST
     */
    public function register(Request $request) 
    {
        try 
        {
            DB::beginTransaction();
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();
            DB::commit();
            $this->setStatusCode(Response::HTTP_CREATED);
            return $this->respond($this->user_transformer->transform($user));
        }
        catch(\Exception $e) 
        {
            DB::rollback();
            dd($e);
            $this->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $this->respond($e);
        }
    }

    /**
     * @decription: get user profile.
     * @author: Cristono Wijaya
     * @return: \Illuminate\Http\Response
     * @http: GET
     */
    public function self() 
    {
        try 
        {
            $self = $this->user_transformer->transform(Auth::user());
            $this->setStatusCode(Response::HTTP_OK);
            return $this->respond($self); 
        }
         catch(\Exception $e) 
        {
            $this->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $this->respond("Error");
        }
    }

    /**
     * @decription: get user list.
     * @author: Cristono Wijaya
     * @return: \Illuminate\Http\Response
     * @http: GET
     */
    public function list() 
    {
        try 
        {
            $current_user = Auth::user();
            $users = User::where('id', '<>', $current_user->id)->get();
            $users->transform(function ($user) {
                return $this->user_transformer->transform($user);
            });
            $this->setStatusCode(Response::HTTP_OK);
            return $this->respond($users); 
        }
        catch(\Exception $e) 
        {
            $this->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $this->respond("Error");
        }
    }

}
