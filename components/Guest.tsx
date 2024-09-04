import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <div className="guest">
      <h1>Welcome</h1>
      <p className=" pb-1">Please Sign In to manage your transactions</p>
      <SignInButton />
    </div>
  );
};
export default Guest;
