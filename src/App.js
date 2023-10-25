import React, { useState } from 'react';
import { Box, Grid, Typography, List, Link, Button, Popover } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const config = {
    "invoices":
        [
            {
                "id": 22, "created_at": "October 19, 2023", "total_price": "1395.00", "items": [
                    { "product_name": "iPad Pro 11 3 gen", "price": 155.0, "image_url": "https://i.postimg.cc/v8hLHbtX/product.jpg", "quantity": 9 }
                ], "status": "Preparing", "full_name": "Joe Zhou", "address1": "34532 Gamble Road", "address2": "APT 503", "city": "San Benito", "state": "TX", "zipcode": "78586"
            },
            {
                "id": 23, "created_at": "October 20, 2023", "total_price": "90.00", "items": [
                    { "product_name": "iPhone 14 Back Glass", "price": 30.0, "image_url": "https://i.postimg.cc/v8hLHbtX/product.jpg", "quantity": 2 },
                    { "product_name": "iPad Pro 999", "price": 10.0, "image_url": "https://i.postimg.cc/v8hLHbtX/product.jpg", "quantity": 3 }
                ], "status": "Preparing", "full_name": "JJ Lin", "address1": "6666 Harwin Drive", "address2": "", "city": "Houston", "state": "TX", "zipcode": "77006"
            }
        ]
}


const PopupButton = (props) => {
    const { title, content, ...rest } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (<React.Fragment>
        <Button onClick={handleClick}
            sx={{
                textTransform: 'none',
                padding: 0,
            }}>
            {title}
            <ArrowDropDownIcon sx={{
                color: 'gray',
            }} />
        </Button>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
            {content}
        </Popover>
    </React.Fragment>)
}

function App() {

    const { invoices } = config;

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
                gap: '10px',
                width: '100vw',

            }}>
                {invoices.map((invoice) => {

                    const { id, created_at, total_price, items, status, full_name, address1, address2, city, state, zipcode } = invoice;

                    return (
                        <Box sx={{
                            display: 'felx',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'start',
                            border: '1px solid silver',
                            width: '80vw',
                            marginBottom: '10px',
                            borderRadius: '10px',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                backgroundColor: '#EEE',
                                borderRadius: '10px 10px 0 0',
                                padding: '10px',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: '5px',
                                    marginRight: '30px',
                                }}>
                                    <Typography>
                                        ORDER PLACED
                                    </Typography>
                                    <Typography>
                                        {created_at}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: '5px',
                                    marginRight: '30px',
                                }}>
                                    <Typography>
                                        TOTAL
                                    </Typography>
                                    <Typography>
                                        {`$${total_price}`}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: '5px',
                                    marginRight: '30px',
                                }}>
                                    <Typography>
                                        SHIP TO
                                    </Typography>
                                    <PopupButton title={full_name} content={
                                        <Box sx={{
                                            padding: '15px',
                                        } }>
                                            <Typography>
                                                {address1}
                                            </Typography>
                                            <Typography>
                                                {address2}
                                            </Typography>
                                            <Typography>
                                                {`${city}, ${state}, ${zipcode}`}
                                            </Typography>
                                            <Typography>
                                                United States
                                            </Typography>
                                        </Box>
                                    } />
                                </Box>
                                
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 1,
                                    textAlign: 'right',
                                    margin: '5px',
                                }}>
                                    <Typography>
                                        {`ORDER #${id}`}
                                    </Typography>
                                    <Link sx={{
                                        textDecoration: 'none',
                                    }}>
                                        View order details
                                    </Link>
                                </Box>
                            </Box>
                            {
                                items.map((item) => {

                                    const { product_name, price, image_url, quantity } = item;

                                    return (
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: {
                                                xs: 'column',
                                                md: 'row'
                                            },
                                            alignItems: 'center',
                                            minHeight: '200px',
                                            borderTop: '1px solid silver',
                                            padding: '20px',
                                            position:'relative',
                                        }}>
                                            <Box sx={{
                                                width: '150px',
                                                height: '150px',
                                            }}
                                                component='img' src={image_url} />
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                marginLeft: {
                                                    xs: '0',
                                                    md: '30px'
                                                },
                                                marginBottom: {
                                                    xs: '40px',
                                                    md: '0'
                                                },
                                            }}>
                                                <Typography sx={{
                                                    fontSize: '2.2rem',
                                                }}>
                                                    {product_name}
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: '1.5rem',
                                                    color: 'gray',
                                                }}>
                                                    {`Quantity: ${quantity}`}
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: '1.5rem',
                                                    color: 'gray',
                                                }}>
                                                    {`Total: $ ${price}`}
                                                </Typography>
                                            </Box>

                                            <Button sx={{
                                                position: 'absolute',
                                                right: '10px',
                                                bottom: '10px',
                                                color: 'black',
                                                textTransform: 'none',
                                                borderColor: 'silver',
                                                '&:hover': {
                                                    borderColor: 'black',
                                                }
                                            }} variant='outlined'>
                                                Write a product reviewer
                                            </Button>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    )
                })}
            </Box>
        </div >
    );
}

export default App;
