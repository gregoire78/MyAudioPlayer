/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{audio{title,picture{data}}, news{title,link,content}}',
    }),
  });
  //const resp1 = await fetch('/api', { method: 'GET' });
  //const { common } = await resp1.json();
  //console.log(common)

  const { data } = await resp.json();
  if (!data || !data.news) throw new Error('Failed to load the news feed.');
  //if (!data1 || !data1.common) throw new Error('Failed to load the metadata feed.');
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: (
      <Layout>
        <Home news={data.news} audio={data.audio}/>
      </Layout>
    ),
  };
}

export default action;
