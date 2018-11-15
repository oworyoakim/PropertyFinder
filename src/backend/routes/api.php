<?php
/**
 * Created by PhpStorm.
 * User: Yoakim
 * Date: 11/15/2018
 * Time: 12:49 PM
 */

Route::group(['prefix' => 'users'], function () {
    Route::get('', 'UsersController@index');
    Route::get('{id}', 'UsersController@getUserById');
    Route::post('', 'UsersController@store');
});

Route::group(['prefix' => 'properties'], function () {
    Route::get('', 'PropertyController@index');
    Route::get('search/{search_term}', 'PropertyController@search');
    Route::get('{id}', 'PropertyController@getPropertyById');
});

Route::group(['prefix' => 'property_types'], function () {
    Route::get('', 'PropertyTypeController@index');
    Route::get('{id}', 'PropertyTypeController@getTypeById');
});