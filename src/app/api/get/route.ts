// this will get data for dashboard page

// paginetion
// search

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/config/dbconfig";


export async function GET(req:NextRequest) {
    // frist do validetion on camming data

    try {
        // then connect to db 
        // and based on the incomming data do aaction 
        // ex. if the parameter is next page then fetch the next page
            // if the parameter is search with catagory
        
    } catch (error) {
        
      return NextResponse.json({Error:"conection error ocured please try again"})
    }
}