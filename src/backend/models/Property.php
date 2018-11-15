<?php

namespace App\Models\PropertyFinder;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use SoftDeletes;
    protected $table = 'properties';

    protected $fillable = [
        'type_id',
        'type_desc',
        'title',
        'description',
        'country',
        'city',
        'suburb',
        'latitude',
        'longitude',
        'size',
        'price',
        'images',
        'documents',
        'taken',
        'taken_date',
        'taken_user_id',
        'user_id',
    ];

    public function type(){
        return $this->belongsTo(PropertyType::class, 'type_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
