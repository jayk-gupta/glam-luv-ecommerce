import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CartUIState {
  itemCount: number;
}

const initialState: CartUIState = {
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.itemCount = action.payload;
    },
  },
});


export const { setCartCount } = cartSlice.actions;
export default cartSlice.reducer;

/*
const { data } = useGetCartQuery();
const dispatch = useDispatch();

useEffect(() => {
  if (data?.items) {
    const total = data.items.reduce((acc, item) => acc + item.quantity, 0);
    dispatch(setCartCount(total));
  }
}, [data]);


//// navbar 
const count = useSelector((state: RootState) => state.cart.itemCount);

<CartIcon>
  {count > 0 && <span className="badge">{count}</span>}
</CartIcon>

*/ 