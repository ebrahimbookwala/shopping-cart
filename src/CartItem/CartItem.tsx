import {
	IconButton,
	Typography,
	CardContent,
	Grid,
	Card,
	CardHeader,
} from "@material-ui/core";

import { CartItemType } from "../App";
import { Wrapper } from "./CartItem.style";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
	item: CartItemType;
	addToCart: (clickedItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
};

const useStyles = makeStyles({
	root: {
		width: "80%",
		margin: "0 auto",
	},
});

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
	const classes = useStyles();
	return (
		<Wrapper>
			<Card raised classes={{ root: classes.root }}>
				<CardHeader
					title={item.title}
					titleTypographyProps={{ variant: "body2" }}
				/>

				<CardContent>
					<Grid container justifyContent="space-around">
						<Grid item xs={12} sm={6} lg={9}>
							<Grid container justify="space-around">
								<Typography variant="body2" color="textSecondary" component="p">
									Price: ${item.price}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									Total: ${(item.price * item.amount).toFixed(2)}
								</Typography>
							</Grid>
							<Grid container justify="space-around">
								<IconButton
									disableRipple={false}
									onClick={() => removeFromCart(item.id)}
								>
									{" "}
									<RemoveCircleOutlineOutlinedIcon />
								</IconButton>
								<p>{item.amount}</p>
								<IconButton onClick={() => addToCart(item)}>
									{" "}
									<AddCircleOutlineOutlinedIcon />
								</IconButton>
							</Grid>
						</Grid>
						<Grid item xs={false} sm={6} lg={3}>
							<img src={item.image} alt={item.title} />
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Wrapper>
	);
};

export default CartItem;
