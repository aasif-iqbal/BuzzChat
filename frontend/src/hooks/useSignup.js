import { useState } from "react"

const useSignup = () => {
  
  // const [loading, setLoading] = useState(false);

  const signup = async ({ fullName, userName, password, confirmPassword, gender}) => {
    const success = handleInputErrors(
      { 
        fullName, 
        userName, 
        password, 
        confirmPassword, 
        gender
      }
    )

    if(!success) return
  }
}

function handleInputErrors({ fullName, userName, password, confirmPassword, gender}){

}

export default useSignup                                  