import { FormLogin } from './form';

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 w-[50rem] h-[30rem] m-auto bg-secondary rounded-md shadow-md">
        <div className="flex justify-center items-center bg-muted/20 gap-2 font-mono">
          <div className="bg-primary w-16 h-16 rounded-full text-white font-extrabold flex justify-center items-center text-4xl">
            dp
          </div>
          <span className="text-primary font-extrabold text-4xl dark:text-white">
            dotap
          </span>
        </div>
        <div className="flex justify-center items-center flex-col">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
