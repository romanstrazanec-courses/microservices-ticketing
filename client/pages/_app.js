// noinspection JSUnusedGlobalSymbols

import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({Component, pageProps}) => {
    return <Component {...pageProps}/>
};

AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const {data} = await client.get('/api/users/currentuser');
    const pageProps = await appContext.Component?.getInitialProps(appContext.ctx) ?? {};
    return {
        pageProps,
        ...data
    };
};

export default AppComponent;