import axios from "axios";

export async function loginAction(prvState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, message: "Invalid Credentials" };
  }

  try {
    const res = await axios.post("http://localhost:3000/api/user/login", {
      email,
      password,
    });

    return { success: true, message: res?.data?.message, data: res };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went Wrong",
    };
  }
}
