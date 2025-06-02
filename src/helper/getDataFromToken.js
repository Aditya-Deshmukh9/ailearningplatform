import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = async function name(request) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value || "";

    const decodeUser = jwt.verify(
      accessToken,
      "ADAPDOADPII2023pw0kc304fkpv30v4V42O2I"
    );

    return decodeUser._id;
  } catch (error) {
    return NextRequest.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
};
