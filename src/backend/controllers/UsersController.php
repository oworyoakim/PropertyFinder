<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class UsersController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        try {
            $users = User::all();
            return response()->json($users);
        } catch (Exception $ex) {
            return response()->json('Server Error: ' . $ex->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUserById($id) {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json('Server Error: User not found!', 404);
            }
            return response()->json($user);
        } catch (Exception $ex) {
            return response()->json('Server Error: ' . $ex->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        try {
            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'address' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'confirmed|required',
                'password_confirmation' => 'required'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json($validator->errors(),500);
            }

            $credentials = [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'password' => $request->password,
                'avatar' => 'admin.png'
            ];
            // register the user
            $user = User::create($credentials);
            return response()->json($user);
        } catch (Exception $ex) {
            return response()->json('Server Error: ' . $ex->getMessage(), 500);
        }
    }

}
