<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'email',
        'password',
        'last_name',
        'first_name',
        'phone',
        'address',
        'avatar'
    ];
    
    public static function byEmail($email){
        return static::whereEmail($email)->first();
    }


    public function fullName(){
        return $this->first_name.' '.$this->last_name;
    }

    public function properties(){
        return $this->hasMany(Property::class);
    }
    
    
}