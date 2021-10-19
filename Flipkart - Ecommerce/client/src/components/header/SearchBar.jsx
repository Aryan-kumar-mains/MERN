import React,{ useState, useEffect } from "react";
import { makeStyles, alpha, InputBase, List, ListItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// product details from database
import { getProducts as listProducts } from "../../redux/actions/productActions";

const useStyle = makeStyles((theme) => ({
  search: {
    borderRadius: 2,
    backgroundColor: "#fff",
    marginLeft: 10,
    width: '38%',
    display: "flex",
  },
  searchIcon: {
    padding: 5,
    height: '100%',
    display: 'flex',
    color: "blue",
  },
  inputRoot: {
    fontSize: "unset",
    width: "100%"
  },
  inputInput: {
    paddingLeft: 20
  },
  searchList: {
    position: "absolute",
    color: "#000",
    background: "#ffffff",
    marginTop: "34px",
    borderRadius: "3px",
  }
}))
const SearchBar = () => {
  const classes = useStyle();
  const [text, setText] = useState(); // for input text in search box
  const [open, setOpen] = useState(true); // for search suggestion

  const getText = (text) => {
    setText(text);
    setOpen(false);
  }

  const { products } = useSelector(state => state.getProducts);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch])

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Search for products, brands and more"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => getText(e.target.value)}
      />
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      {
        text &&
        <List className={classes.searchList} hidden={open}>
          { // here we are using 'includes' instead of '===' bcz includes fn just find the text(i.e entered by user) in sentence and return true or false
            // filter returns an array (of product) if 'includes' return true
            products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <Link 
                        to={`/product/${product.id}`} 
                        style={{ textDecoration:'none', color:'inherit'}}
                        onClick={() => setOpen(true)}  
                      >
                        {product.title.longTitle}
                      </Link>
                    </ListItem>
                  ))
          }
        </List>
      }
    </div>
  )
}

export default SearchBar;