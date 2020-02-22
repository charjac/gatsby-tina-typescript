/* eslint-disable @typescript-eslint/no-explicit-any */
import '@animated-burgers/burger-squeeze/dist/styles.css';

import { useTheme } from 'emotion-theming';
import { useStaticQuery, graphql } from 'gatsby';
import { useGlobalJsonForm } from 'gatsby-tinacms-json';
import { transparentize } from 'polished';
import React, { useMemo, useContext } from 'react';

import headerForm from '../@cms/form/globals/header';
import { getThumbnail } from '../@cms/helpers/thumbnail';
import { MenuContext } from '../context/side-menu';
import useScroll from '../hooks/useScroll';
import { Theme } from '../styles/theme';
import { HeaderContainer, Navbar, NavigationLink, HeaderLogo, MenuButton } from './styled';
import useIsMobile from '../hooks/useIsMobile';

const Header: React.FC = () => {
  const { layoutJson, allFile } = useStaticQuery(graphql`
    query Header {
      layoutJson(fileRelativePath: { regex: "/header/" }) {
        fileRelativePath
        rawJson
        id
        color
        backgroundColor
        fontSize
        linkSpace
        mobileLogo
        logo
        withLogo
        activeLinkColor
        links {
          path
          label
        }
      }
      allFile {
        ...FluidImg
      }
    }
  `);

  layoutJson.files = allFile.edges;

  const theme = useTheme<Theme>();
  const isMobile = useIsMobile();
  const [{ links, withLogo, logo, linkSpace, color, fontSize, backgroundColor, activeLinkColor }] = useGlobalJsonForm(
    layoutJson,
    headerForm,
  ) as any;
  const { toggleMenu, isMenuOpen } = useContext(MenuContext);
  const logoSrc = useMemo(() => getThumbnail(allFile.edges, logo), [logo, allFile.edges]);
  const { isTop, scrollDirection } = useScroll({
    offset: isMobile ? theme.dimensions.heights.headerMobile : theme.dimensions.heights.header,
    throttleTime: 200,
  });

  const linkStyle = {
    padding: `0 ${linkSpace}`,
    color,
    fontSize,
  };

  return (
    <HeaderContainer color={backgroundColor} isTop={isTop} scrollDirection={scrollDirection}>
      <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      {withLogo && !!logo && <HeaderLogo src={logoSrc} />}
      <Navbar>
        {links.map(({ path, label }: any) => (
          <NavigationLink
            key={path}
            to={path}
            style={linkStyle}
            activeColor={activeLinkColor}
            activeStyle={{
              backgroundColor: activeLinkColor ? transparentize(0.7, activeLinkColor) : 'inherit',
            }}
          >
            {label}
          </NavigationLink>
        ))}
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;
