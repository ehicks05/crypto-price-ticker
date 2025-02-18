import { Route, Switch } from 'wouter';
import { useShallow } from 'zustand/shallow';
import { Footer, Header, ProductDetail, Products, Settings } from './components';
import ProductDetailOld from './components/ProductDetailOld';
import useStore from './store';

function App() {
	const isShowSettings = useStore(useShallow((state) => state.isShowSettings));

	return (
		<div className="flex flex-col h-dvh">
			<Header />
			{isShowSettings && <Settings />}
			<div className="flex-grow flex flex-col h-full overflow-y-auto">
				<Switch>
					<Route path="/:productId" component={ProductDetail} />
					<Route path="/:productId/old" component={ProductDetailOld} />
					<Route path="/" component={Products} />
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
