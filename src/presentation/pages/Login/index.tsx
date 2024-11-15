import { LoginForm } from "@/presentation/components/General/LoginForms";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isSignin = location.pathname === "/signin";

  return (
    <S.Container>
      <S.TabsContainer>
        <S.ActionButton
          size="sm"
          variant={isLogin ? "primary" : "ghost"}
          isActive={isLogin}
          onClick={() => navigate("/login")}
        >
          Login
        </S.ActionButton>
        <S.ActionButton
          size="sm"
          variant={isSignin ? "primary" : "ghost"}
          isActive={isSignin}
          onClick={() => navigate("/signin")}
        >
          Sign In
        </S.ActionButton>
      </S.TabsContainer>
      <S.Content>
        {isLogin && <LoginForm />}
        {isSignin && <S.SignInSoon>Em Breve</S.SignInSoon>}
      </S.Content>
    </S.Container>
  );
};
