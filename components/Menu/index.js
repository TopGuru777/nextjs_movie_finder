/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useSelector } from 'react-redux';

import Logo from 'components/Logo';
import SectionHeading from './SectionHeading';
import MenuItem from './MenuItem';
import MenuItemLink from './MenuItemLink';
import Copyright from 'components/Copyright';
import TMDBMark from 'components/TMDBMark';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';

const renderStaticCategories = (staticCategories, selectedMenuItemName, closeMenu = null) => {
  const menuItemLinks = staticCategories.map(staticCategory => (
    <MenuItemLink
      key={staticCategory.id}
      href={{
        pathname: LINKS.HOME.HREF,
        query: {
          [QUERY_PARAMS.CATEGORY]: staticCategory.name,
          [QUERY_PARAMS.PAGE]: 1
        }
      }}
      onClick={closeMenu}
      selected={staticCategory.name === selectedMenuItemName}>
      <MenuItem title={staticCategory.name} />
    </MenuItemLink>
  ));

  return menuItemLinks;
};

const renderGenres = (genres, selectedMenuItemName, closeMenu = null) => {
  const menuItemLinks = genres.map(genre => (
    <MenuItemLink
      key={genre.id}
      href={{
        pathname: LINKS.GENRE.HREF,
        query: {
          [QUERY_PARAMS.ID]: genre.id,
          [QUERY_PARAMS.NAME]: genre.name,
          [QUERY_PARAMS.PAGE]: 1
        }
      }}
      onClick={closeMenu}
      selected={genre.name === selectedMenuItemName}>
      <MenuItem title={genre.name} />
    </MenuItemLink>
  ));

  return menuItemLinks;
};

const Menu = ({
  isMobile,
  closeMenu,
  ...rest
}) => {
  const staticCategories = useSelector(state => state.general.staticCategories);
  const genres = useSelector(state => state.general.genres);
  const selectedMenuItemName = useSelector(state => state.general.selectedMenuItemName);

  return (
    <>
      <nav {...rest}>
        {!isMobile && <Logo />}
        <SectionHeading>Discover</SectionHeading>
        {renderStaticCategories(staticCategories, selectedMenuItemName, closeMenu)}
        <SectionHeading>Genres</SectionHeading>
        {renderGenres(genres, selectedMenuItemName, closeMenu)}
        <Copyright
          className='copyright'
          href='https://www.github.com/addyosmani'
          text='Copyright © Addy Osmani' />
        <TMDBMark className='tmdb-mark' />
      </nav>
      <style jsx>{`
        :global(.copyright) {
          display: flex;
          justify-content: center;
          margin: 24px 8px;
        }

        :global(.tmdb-mark) {
          margin: 16px 8px;
        }
      `}</style>
    </>
  );
};

export default Menu;
