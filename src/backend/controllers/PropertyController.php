<?php

namespace App\Http\Controllers\PropertyFinder;

use App\Models\PropertyFinder\Property;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
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
