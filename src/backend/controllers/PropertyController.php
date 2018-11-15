<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Exception;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $result = Property::with('user')->get();
            return response()->json($result);
        } catch (Exception $ex) {
            return response()->json('Server Error: ' . $ex->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $rules = [];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json($validator->errors(),500);
            }

            // register the user
            $property = Property::create($request->all());
            return response()->json($property);
        } catch (Exception $ex) {
            return response()->json('Server Error: ' . $ex->getMessage(), 500);
        }
    }

    public function search($search_term)
    {
        try {
            $search_term = strtolower($search_term);
            $result = Property::with('user')
                ->where('city', 'like', '%' . $search_term . '%')
                ->orWhere('suburb','like','%' . $search_term . '%')
                ->orWhere('title','like','%' . $search_term . '%')
                ->orWhere('description','like','%' . $search_term . '%')
                ->get();
            return response()->json($result);
        } catch (Exception $ex) {
            return response()->json('Server Error: ' . $ex->getMessage(), 500);
        }
    }

    public function getPropertyById($id)
    {
        try {
            return response()->json(Property::with('user')->find($id));
        } catch (Exception $ex) {
            return response()->json('Server Error: ' . $ex->getMessage(), 500);
        }
    }
}
