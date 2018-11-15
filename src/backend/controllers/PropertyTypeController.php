<?php

namespace App\Http\Controllers;

use App\Models\PropertyType;
use Illuminate\Http\Request;


class PropertyTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $types = PropertyType::all();
            return response()->json($types);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getPropertyTypeById($id)
    {
        try {
            $type = PropertyType::find($id);
            if (!$type) {
                return response()->json('Server Error: Property type not found!', 404);
            }
            return response()->json($type);
        } catch (Exception $ex) {
            return response()->json('Server Error: ' . $ex->getMessage(), 500);
        }
    }

}
