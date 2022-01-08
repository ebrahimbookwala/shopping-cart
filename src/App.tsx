import { useState } from "react";
import { useQuery } from "react-query";
//Components
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
//styles
import { Wrapper, StyledButton } from "./App.styles";
import { NumberLiteralType } from "typescript";

//Types
export type CartItemType = {
	id: number;
	category: string;
	image: string;
	description: string;
	price: number;
	amount: number;
	title: string;
};

const getProducts = async (): Promise<CartItemType[]> =>
	await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);

	const { data, isLoading, error } = useQuery<CartItemType[]>(
		"products",
		getProducts
	);

	console.log(cartItems);

	const getTotalItems = (items: CartItemType[]) =>
		items.reduce((total, accum) => (total += accum.amount), 0);

	const handleAddToCart = (clickedItem: CartItemType) => {
		const clickedIndex = cartItems.findIndex(
			(item) => item.id === clickedItem.id
		);

		const newItem: CartItemType =
			clickedIndex > -1
				? {
						...cartItems[clickedIndex],
						amount: cartItems[clickedIndex].amount + 1,
				  }
				: {
						id: clickedItem.id,
						amount: 1,
						category: clickedItem.category,
						description: clickedItem.description,
						image: clickedItem.image,
						price: clickedItem.price,
						title: clickedItem.title,
				  };

		setCartItems((prev) => {
			if (clickedIndex < 0) {
				return [...prev, newItem];
			} else {
				const newCart: CartItemType[] = prev.map((item) =>
					item.id === clickedItem.id
						? { ...item, amount: item.amount + 1 }
						: item
				);
				return newCart;
			}
		});
	};

	const handleRemoveFromCart = (clickedId: number) => {
		// const removedItem: CartItemType | undefined = cartItems.find(item => item.id === clickedId);

		setCartItems((prev) =>
			prev
				.map((item) =>
					item.id === clickedId ? { ...item, amount: item.amount - 1 } : item
				)
				.filter((item) => item.amount > 0)
		);
	};

	if (isLoading) {
		return <LinearProgress />;
	}

	if (error) {
		return <div>Something went wrong</div>;
	}

	return (
		<Wrapper>
			<Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
				<Cart
					addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
					cartItems={cartItems}
				/>
			</Drawer>
			<StyledButton onClick={() => setCartOpen(true)}>
				<Badge badgeContent={getTotalItems(cartItems)} color="error">
					<AddShoppingCartIcon />
				</Badge>
			</StyledButton>

			<Grid container spacing={3}>
				{data?.map((i) => (
					<Grid item key={i.id} xs={12} sm={4}>
						<Item item={i} handleAddToCart={handleAddToCart} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	);
};

export default App;
