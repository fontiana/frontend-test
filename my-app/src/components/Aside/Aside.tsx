import * as S from "./Aside.styles";
import { MdDashboard } from "react-icons/md";

const MenuItems = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: MdDashboard,
  },
];

export const Aside = () => {
  return (
    <S.Wrapper>
      <S.SidenavHeader>
        <S.MyWallet>MY BIDS</S.MyWallet>
      </S.SidenavHeader>

      <S.MenuContainer>
        {MenuItems.map((menuItem, index) => (
          <S.MenuItemLink key={index} href={menuItem.route}>
            {menuItem.icon}
            {menuItem.name}
          </S.MenuItemLink>
        ))}
      </S.MenuContainer>
    </S.Wrapper>
  );
};
