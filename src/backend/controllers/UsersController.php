<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laracasts\Flash\Flash;
use Sentinel;
use Exception;

class UsersController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        try {
            if (!Sentinel::hasAccess('users.view')) {
                Flash::warning('Permission Denied!');
                return redirect()->back();
            }
            $users = [];
            foreach (Sentinel::getUserRepository()->get() as $user) {
                foreach ($user->roles as $role) {
                    if ($role->slug !== 'student') {
                        $users[] = $user;
                    }
                }
            }
            $roles = Sentinel::getRoleRepository()->get();
            return view('users.index', compact('users', 'roles'));
        } catch (Exception $ex) {
            Flash::warning($ex->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        try {
            if (!Sentinel::hasAccess('users.show')) {
                Flash::success('Permission Denied!');
                return redirect()->back();
            }

            $user = User::find($id);
            if (!$user) {
                Flash::success('Invalid User!');
                return redirect()->back();
            }
            return view('users.show', compact('user'));
        } catch (Exception $ex) {
            Flash::warning($ex->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        try {
            if (!Sentinel::hasAccess('users.create')) {
                Flash::success('Permission Denied!');
                return redirect()->back();
            }

            $roles = [];
            foreach (Sentinel::getRoleRepository()->get() as $row) {
                if ($row->slug !== 'student') {
                    $roles[$row->id] = $row->name;
                }
            }
            return view('users.create', compact('roles'));
        } catch (Exception $ex) {
            Flash::warning($ex->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createProcess(Request $request) {
        try {
            if (!Sentinel::hasAccess('users.create')) {
                Flash::success('Permission Denied!');
                return redirect()->back();
            }
            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'address' => 'required',
                'role_id' => 'required',
                'gender' => 'required',
                'dob' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'confirmed|required',
                'password_confirmation' => 'required'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                Flash::warning(trans('general.validation_error'));
                return redirect()->back()->withInput()->withErrors($validator);
            }

            $credentials = [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'gender' => $request->gender,
                'dob' => $request->dob,
                'address' => $request->address,
                'password' => $request->password,
                'avatar' => 'admin.png'
            ];
            // register the user
            $user = Sentinel::registerAndActivate($credentials);
            // attach this user to the role
            $role = Sentinel::findRoleById($request->role_id);
            $role->users()->attach($user);

            // send notifications
            // $this->sendActivationEmail($user, $activation->code);

            Flash::success('New User Created Successfully!');
            return redirect('admin/users');
        } catch (Exception $ex) {
            Flash::warning($ex->getMessage());
            return redirect()->back()->withInput()->with(["error" => $ex]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id) {
        try {
            if (!Sentinel::hasAccess('users.update')) {
                Flash::success('Permission Denied!');
                return redirect()->back();
            }

            $user = User::find($id);
            if (!$user) {
                Flash::success('Invalid User!');
                return redirect()->back();
            }

            $role = $user->roles()->first();

            $roles = [];
            foreach (Sentinel::getRoleRepository()->get() as $row) {
                if ($row->slug !== 'student') {
                    $roles[$row->id] = $row->name;
                }
            }
            return view('users.update', compact('user', 'role', 'roles'));
        } catch (Exception $ex) {
            Flash::warning($ex->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateProcess(Request $request, $id) {
        try {
            if (!Sentinel::hasAccess('users.update')) {
                Flash::success('Permission Denied!');
                return redirect()->back();
            }

            $user = Sentinel::getUserRepository()->findById($id);
            if (!$user) {
                Flash::success('Invalid User!');
                return redirect()->back();
            }
            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'address' => 'required',
                'role_id' => 'required',
                'gender' => 'required',
                'dob' => 'required',
                'email' => 'required|email|unique:users'
            ];

            if ($request->password) {
                $rules['password'] = 'confirmed|required';
                $rules['password_confirmation'] = 'required';
            }

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                Flash::warning(trans('general.validation_error'));
                return redirect()->back()->withInput()->withErrors($validator);
            }

            $credentials = [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'gender' => $request->gender,
                'dob' => $request->dob,
                'address' => $request->address
            ];

            if ($request->password) {
                $credentials['password'] = $request->password;
            }

            $user = Sentinel::update($user, $credentials);
            Flash::success('User Info Updated Successfully!');
            return redirect('admin/users');
        } catch (Exception $ex) {
            Flash::warning($ex->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        try {
            if (!Sentinel::hasAccess('users.delete')) {
                Flash::success('Permission Denied!');
                return redirect()->back();
            }

            $user = Sentinel::getUserRepository()->findById($id);
            if (!$user) {
                Flash::success('Invalid User!');
                return redirect()->back();
            }
            $user->destroy();
            Flash::success('User Deleted Successfully!');
            return redirect('admin/users');
        } catch (Exception $ex) {
            Flash::warning($ex->getMessage());
            return redirect()->back()->withInput();
        }
    }

}
