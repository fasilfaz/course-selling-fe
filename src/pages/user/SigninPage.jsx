import Signin from "../../components/user/Signin";

const SigninPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-5">
      <h1 className="cursor-pointer rounded-lg px-4 py-1 text-2xl text-blue-700 shadow-lg transition-all duration-300 ease-in  hover:scale-110">
        User Signin page
      </h1>
        <Signin/>
    </div>
  )
}

export default SigninPage;