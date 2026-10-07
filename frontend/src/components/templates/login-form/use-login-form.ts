import { useAccountLoginHook } from "@/api/serviceUser/hooks/account";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const isMock = true;

export function useLoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const login = useAccountLoginHook({
    client: {
      baseURL: `${import.meta.env.REACT_APP_BASE_LOGIN}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "client-id": "clientidaudit",
        "client-secret": "clientsecretaudit",
      },
    },
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
  //   const data = {
  //     username: values.username,
  //     password: values.password,
  //   };
  //   navigate({
  //     to: "/home",
  //     replace: true,
  //   });

  //   // login.mutate(
  //   //   { data },
  //   //   {
  //   //     onSuccess: async (data) => {
  //   //       localStorage.setItem(
  //   //         import.meta.env.REACT_APP_CLIENT_ID,
  //   //         JSON.stringify(data)
  //   //       );

  //   //       localStorage.setItem(
  //   //         "accessToken",
  //   //         data.tokenResponse?.accessToken ?? ""
  //   //       );

  //   //       setUser(data);
  //   //       toast("Success!", {
  //   //         description: "Welcome Back.",
  //   //       });

  //   //       navigate({
  //   //         to: "/home",
  //   //         replace: true,
  //   //       });
  //   //     },
  //   //     onError: (error) => {
  //   //       const err = error as AxiosError;
  //   //       if (err) {
  //   //         if (err.response?.status === 400) {
  //   //           return toast("Error!", {
  //   //             description: `${err.response.data === "Username or Password is Invalid." ? err.response.data : "Something went wrong."}`,
  //   //           });
  //   //         }
  //   //       }

  //   //       return toast("Error!", {
  //   //         description: "Something went wrong.",
  //   //       });
  //   //     },
  //   //   }
  //   // );
  // };

  const onSubmit = async (values) => {
    localStorage.setItem("accessToken", "dummy-token");
    if (isMock) {
      navigate({ to: "/home" });
      return;
    }

    // real API nanti
  };

  return { form, onSubmit, showPassword, handleShowPassword, isLoading: login.isPending };
}
