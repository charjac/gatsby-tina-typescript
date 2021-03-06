import '@animated-burgers/burger-squeeze/dist/styles.css';

import { useTheme } from 'emotion-theming';
import { useStaticQuery, graphql } from 'gatsby';
import { transparentize } from 'polished';
import React, { useContext } from 'react';

import useIsMobile from '@hooks/useIsMobile';
import useScroll from '@hooks/useScroll';
import { MenuContext } from '@providers/menu';
import { Theme } from '@typings/theme';
import { Menus } from '@typings/menu';
import { Site } from '@typings/site';
import { HeaderContainer, Navbar, NavigationLink, HeaderLogo, MenuButton } from './styled';

const Header: React.FC = () => {
  const {
    settingsJson: {
      header: { withLogo, linkSpace, color, fontSize, activeLinkColor, fixed, animated },
    },
    menus: { menus },
    site: { logo },
  } = useStaticQuery<{ settingsJson: Theme; menus: Menus; site: Site }>(graphql`
    query Header {
      site: settingsJson(fileRelativePath: { regex: "/site/" }) {
        logo {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      settingsJson(fileRelativePath: { regex: "/theme/" }) {
        header {
          color
          fontSize
          linkSpace
          withLogo
          activeLinkColor
          fixed
          animated
        }
      }
      menus: settingsJson(fileRelativePath: { regex: "/menus/" }) {
        menus {
          name
          links {
            label
            path
          }
        }
      }
    }
  `);

  const theme = useTheme<Theme>();
  const isMobile = useIsMobile();
  const { toggleMenu, isMenuOpen } = useContext(MenuContext);
  const { isTop, scrollDirection } = useScroll({
    offset: isMobile ? theme.header.height : theme.header.heightLg,
    throttleTime: 200,
  });

  const linkStyle = {
    padding: `0 ${linkSpace}`,
    color,
    fontSize,
  };

  return (
    <HeaderContainer isTop={isTop} scrollDirection={scrollDirection} fixed={fixed} animated={animated}>
      <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      {withLogo && !!logo && <HeaderLogo fluid={logo.childImageSharp.fluid} />}
      <Navbar>
        {menus
          .find(({ name }) => name === 'main')
          ?.links.map(({ path, label }) => (
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

export const headerField = {
  label: 'Header',
  component: 'group',
  name: 'rawJson.header',
  fields: [
    {
      label: 'Display logo ?',
      name: 'withLogo',
      component: 'toggle',
    },
    {
      label: 'Mobile Menu animation',
      name: 'sideMenuType',
      description: 'the animation used by the mobile burger navigation menu',
      component: 'select',
      options: ['bubble', 'elastic', 'fallDown', 'push', 'pushRotate', 'reveal', 'scaleDown', 'scaleRotate', 'slide', 'stack'],
    },
    {
      label: 'Background color',
      name: 'backgroundColor',
      component: 'color',
    },
    {
      label: 'background opacity',
      name: 'opacity',
      component: 'slider',
      min: 0,
      max: 1,
      step: 0.1,
    },
    {
      label: 'Active Link bg color',
      name: 'activeLinkColor',
      component: 'color',
    },
    {
      label: 'Text size',
      name: 'fontSize',
      component: 'text',
    },
    {
      label: 'Text color',
      name: 'color',
      component: 'color',
    },
    {
      label: 'Link spaces',
      name: 'linkSpace',
      component: 'text',
    },
    {
      label: 'height on small device',
      name: 'height',
      component: 'slider',
      min: 0,
      max: 100,
      step: 1,
    },
    {
      label: 'height on large device',
      name: 'heightLg',
      component: 'slider',
      min: 0,
      max: 100,
      step: 1,
    },
    {
      label: 'fixed',
      name: 'fixed',
      component: 'toggle',
    },
    {
      label: 'animated',
      name: 'animated',
      component: 'toggle',
    },
  ],
};
