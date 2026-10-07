import { CustomInput } from "@/components/atoms/custom-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "./use-login-form";
import testProps from "@/lib/testing";
// import WarakasLogo from "../../../../public/assets/images/warakas-logo";
import {
  LOGIN_FORM_BUTTON_SUBMIT,
  LOGIN_FORM_INPUT_PASSWORD,
  LOGIN_FORM_INPUT_USERNAME,
} from "@/constants/test-ids/login";

export function LoginForm() {
  const WarakasLogo = "/assets/images/warakas-logo.png";
  const { form, showPassword, handleShowPassword, onSubmit, isLoading } =
    useLoginForm();

  return (
    <div className="flex min-h-screen">

      {/* LEFT - BLUE SIDE */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden items-center justify-center">

        {/* Bubble background */}
        <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -right-20 blur-2xl"></div>
        <div className="absolute w-72 h-72 bg-white/10 rounded-full -bottom-20 -left-20 blur-2xl"></div>

        <h1 className="text-white text-3xl font-bold z-10">
          Welcome 👋
        </h1>
      </div>

      {/* RIGHT - FORM */}
      <div className="flex-1 bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="text-center mb-10">
            <p className="text-gray-500 mb-2">
              Selamat Datang di
            </p>
            <div className="flex justify-center">
              <WarakasLogo width={220} />
            </div>
          </div>

          {/* FORM */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* USERNAME */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">User</FormLabel>
                    <FormControl>
                      <CustomInput
                        type="text"
                        inputStyle="borderless"
                        placeholder="Email / NIP"
                        {...testProps(LOGIN_FORM_INPUT_USERNAME)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">Password</FormLabel>
                    <FormControl>
                      <CustomInput
                        type={showPassword ? "text" : "password"}
                        inputStyle="borderless"
                        placeholder="Password"
                        addonRight={
                          showPassword ? (
                            <Eye onClick={handleShowPassword} size={16} />
                          ) : (
                            <EyeOff onClick={handleShowPassword} size={16} />
                          )
                        }
                        {...testProps(LOGIN_FORM_INPUT_PASSWORD)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BUTTON */}
              <div className="pt-6">
                <Button
                  size="lg"
                  className="w-full font-bold flex items-center justify-center gap-2"
                  disabled={isLoading}
                  {...testProps(LOGIN_FORM_BUTTON_SUBMIT)}
                >
                  {isLoading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 
                        0 0 5.373 0 12h4zm2 
                        5.291A7.962 7.962 0 
                        014 12H0c0 3.042 
                        1.135 5.824 3 
                        7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}