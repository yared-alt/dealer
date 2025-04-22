// this will wpdate the specfic car data in db

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/config/dbconfig";

export async function POST(req:NextRequest) {
    // frist do validetion on camming data

    try {
        // then connect to db 
        
    } catch (error) {
        // find spesfic data and update it
      return NextResponse.json({Error:"conection error ocured please try again"})
    }
}