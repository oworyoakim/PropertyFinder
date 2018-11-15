<?php
namespace App\Models;

use Cartalyst\Sentinel\Users\EloquentUser;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends EloquentUser
{
    use SoftDeletes;
    
    protected $fillable = [
        'email',
        'password',
        'last_name',
        'first_name',
        'permissions',
        'gender',
        'dob',
        'phone',
        'country',
        'city',
        'address',
        'avatar'
    ];
    
    public static function byEmail($email){
        return static::whereEmail($email)->first();
    }


    public function fullName(){
        return $this->first_name.' '.$this->last_name;
    }
    
    public function challenges(){
        return $this->hasMany(Challenge::class,'student_id','id');
    }
    
    
}