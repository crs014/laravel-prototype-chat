<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messager extends Model
{
    use HasFactory;

    protected $table = 'messagers';
    protected $hidden = ['id'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['sender', 'receiver', 'content'];

     /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at'
    ];

    public function user_sender() 
    {
        return $this->belongsTo(User::class, 'sender');
    }

    public function user_receiver() 
    {
        return $this->belongsTo(User::class, 'receiver');
    }
}
