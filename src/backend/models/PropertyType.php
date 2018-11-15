<?php

namespace App\Models\PropertyFinder;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyType extends Model
{
    use SoftDeletes;

    protected $table = 'property_types';

    protected $fillable = [
        'title',
        'description',
        'user_id',
    ];
}
