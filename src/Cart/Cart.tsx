import CartItem from "../CartItem/CartItem";
//Styles
import { Wrapper } from "./Cart.styles";
//Types
import { CartItemType } from "../App";
import { Typography, Grid, Card } from "@material-ui/core";

type Props = {
	cartItems: CartItemType[];
	addToCart: (clickedItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
	return (
		<Wrapper>
			<h2>Your Shopping Cart</h2>

			{cartItems.length === 0 ? <p> No items in cart.</p> : null}
			{cartItems.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
				/>
			))}

			<Card>
				<Grid container justify="space-around">
					<Typography variant="h6">Total</Typography>
					<Typography variant="h6">
						{cartItems
							.reduce(
								(tot, current) => (tot += current.price * current.amount),
								0
							)
							.toFixed(2)}
					</Typography>
				</Grid>
			</Card>
		</Wrapper>
	);
};

export default Cart;
