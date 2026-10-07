import { u as useNavigate } from './index-D7Nd4y7s.js';

function Index() {
  const navigate = useNavigate();
  if (!localStorage.getItem("user")) {
    return navigate({
      to: "/login",
      replace: true
    });
  }
  return navigate({
    to: "/dashboard",
    replace: true
  });
}

export { Index as component };
