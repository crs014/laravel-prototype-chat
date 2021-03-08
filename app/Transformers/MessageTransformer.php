<?php
namespace App\Transformers;

use App\Transformers\UserTransformer;
use Illuminate\Support\Facades\Auth;

class MessageTransformer extends Transformer 
{
    
    /**
     * @var: \App\Repository\Transformers\UserTransformer
    */
    private $_userTransformer;

    public function __construct(UserTransformer $userTransformer) 
    {
        $this->_userTransformer = $userTransformer;
    }

    public function transform($message) 
    {
        $current_user = Auth::user();
        $receiver = $this->_userTransformer->transform($message->user_receiver);
        $sender = $this->_userTransformer->transform($message->user_sender);
        $self = ($sender['id'] == $current_user->id) ? true : false;

        return [
            'id' => $message->id,
            'receiver' => $receiver,
            'sender' => $sender,
            'content' => $message->content,
            'created_at' => $message->created_at,
            'self' => $self
        ];
    }
}

?>