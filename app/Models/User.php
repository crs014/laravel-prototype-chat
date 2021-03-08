<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sender_messages() 
    {
        return $this->hasMany(Messager::class, 'sender');
    }

    public function receiver_messages() 
    {
        return $this->hasMany(Messager::class, 'receiver');
    }

    public function get_private_messages($id) 
    {
        try 
        {
            $receiver_client = $this->receiver_messages->where('sender', $id);
            $sender_client = $this->sender_messages->where('receiver', $id);
            
            return $receiver_client->merge($sender_client)->sortBy('created_at')->values();
        }
        catch(\Exception $e) 
        {
            return [];
        }
    }
}
