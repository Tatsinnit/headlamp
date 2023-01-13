import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { KubeObject } from '../lib/k8s/cluster';
import defaultStore from '../redux/stores/store';

export type TestContextProps = PropsWithChildren<{
  store?: ReturnType<typeof createStore>;
  routerMap?: Record<string, string>;
  urlSearchParams?: {
    [key: string]: string;
  };
}>;

export function TestContext(props: TestContextProps) {
  const { store, routerMap, urlSearchParams, children } = props;
  let url = '';
  let routePath = '';

  for (const [key, value] of Object.entries(routerMap || {})) {
    // Add the prefix : to the key to make it a param if needed.
    routePath += '/' + (key.startsWith(':') ? key : ':' + key);
    url += '/' + value;
  }

  if (!!urlSearchParams) {
    url += '?' + new URLSearchParams(urlSearchParams).toString();
  }

  return (
    <Provider store={store || defaultStore}>
      <MemoryRouter initialEntries={url ? [url] : undefined}>
        {routePath ? <Route path={routePath}>{children}</Route> : children}
      </MemoryRouter>
    </Provider>
  );
}

export function overrideKubeObject(
  kubeObject: KubeObject,
  propsToOverride: { [method: keyof KubeObject]: KubeObject[keyof KubeObject] | undefined }
) {
  for (const [key, value] of Object.entries(propsToOverride)) {
    if (value !== undefined) {
      kubeObject[key] = value;
    }
  }
}
