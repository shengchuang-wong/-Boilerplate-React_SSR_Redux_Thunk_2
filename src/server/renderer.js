import React from "react";
import ReactDOM from "react-dom/server";
import Layout from "../common/Layout";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import getData from "../common/getData";
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

export default function renderer(html, path, context, store) {
  const promises = getData(path, store);
  return Promise.all(promises).then(() => {
      const serverHtml = ReactDOM.renderToString(
        <Provider store={store}>
          <StaticRouter location={path} context={context}>
              <Layout />
          </StaticRouter>
        </Provider>
      );

      
  const regex = /(<div id="root">)(<\/div>)/;
  html = html.replace(regex, function(original, div1, div2) {
      return div1 + serverHtml + div2 + `<script>
      window.INITIAL_STATE=${serialize(store.getState())}
    </script>`;
  });

  const helmet = Helmet.renderStatic();
  const head = helmet.title.toString() + helmet.meta.toString();
  const index = html.indexOf("</head>");
  const html1 = html.slice(0, index);
  const html2 = html.slice(index);
  return html1 + head + html2;
  });
}