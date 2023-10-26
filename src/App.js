import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, Button, Popover } from '@mui/material';
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


const PopupButton = (props, key) => {
    const { title, content} = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [inButton, setInButton] = useState(false);
    const [inPopover, setInPopover] = useState(false);

    const handleEnterButton = (event) => {
        setAnchorEl(event.currentTarget);
        setInButton(true);
    };

    const handleLeaveButton = (event) => {
        setInButton(false);
    };

    const handleEnterPopover = (event) => {
        setInPopover(true);
    };

    const handleExitPopover = (event) => {
        setInPopover(false);
    };

    // the popover will be shown either the mouse enter the button or enter the popover paper
    // when mouse leave both components, hide the popover after several time
    useEffect(() => {
        let timer = null;
        if (inButton | inPopover) {
            setOpen(true);
        }
        else {
            timer = setTimeout(() => {
                setOpen(false);
            }, 200);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [inButton, inPopover]);

    return (<div>
        <Button aria-owns={open ? `ship-to-popover-${key}` : undefined}
            aria-haspopup="true"
            onMouseOver={handleEnterButton}
            onClick={handleEnterButton}
            onMouseLeave={handleLeaveButton}
            sx={{
                position:'relative',
                textTransform: 'none',
                padding: 0,
                zIndex: 5,
            }}>
            {title}
            <ArrowDropDownIcon sx={{
                color: 'gray',
            }} />
        </Button>
        <Popover id={`ship-to-popover-${key}`}
            open={open}
            anchorEl={anchorEl}
            
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}

            sx={{
                zIndex: 4,
            }}
            marginThreshold={-1000}

            disableScrollLock
            disableRestoreFocus
        >
            <Box 
                onMouseEnter={handleEnterPopover}
                onMouseLeave={handleExitPopover}
            >
                {content}
            </Box>
        </Popover>
    </div>)
}


const classes = {
    orderTitle: {
        color: '#565959',
        fontFamily: 'Arial,sans-serif',
        fontSize: '12px',
    },

    orderValue: {
        color: '#565959',
        fontFamily: 'Arial,sans-serif',
        fontSize: '14px',
    }
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
                width: {
                    md: '100vw',
                    xs: '900px'
                },
            }}>
                {invoices.map((invoice, index) => {

                    const { id, created_at, total_price, items, full_name, address1, address2, city, state, zipcode } = invoice;

                    return (
                        <Box key={`invoice-${index}`}
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            justifyContent: 'start',
                            border: '1px solid silver',
                            width: '900px',
                            marginBottom: '10px',
                            borderRadius: '10px',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                backgroundColor: '#EEE',
                                borderRadius: '10px 10px 0 0',
                                padding: '12px',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginRight: '30px',
                                }}>
                                    <Typography sx={classes.orderTitle}>
                                        ORDER PLACED
                                    </Typography>
                                    <Typography sx={classes.orderValue}>
                                        {created_at}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginRight: '30px',
                                }}>
                                    <Typography sx={classes.orderTitle}>
                                        TOTAL
                                    </Typography>
                                    <Typography sx={classes.orderValue}>
                                        {`$${total_price}`}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <Typography sx={classes.orderTitle}>
                                        SHIP TO
                                    </Typography>
                                    <PopupButton key={`popover-${index}` } title={full_name} content={
                                        <Box sx={{
                                            padding: '15px',
                                        }}>
                                            <Typography>
                                                {full_name}
                                            </Typography>
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
                                }}>
                                    <Typography sx={classes.orderTitle}>
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
                                items.map((item, index) => {

                                    const { product_name, price, image_url, quantity } = item;

                                    return (
                                        <Box key={`item-${index}`}
                                            sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
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
                                                marginLeft: '30px',
                                            }}>
                                                <Typography sx={{
                                                    fontSize: '30px',
                                                    marginBottom: '15px'
                                                }}>
                                                    {product_name}
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: '20px',
                                                    color: 'gray',
                                                }}>
                                                    {`Quantity: ${quantity}`}
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: '20px',
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
