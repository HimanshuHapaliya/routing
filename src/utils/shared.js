const Role = {
    Admin: 1,
    Seller: 2,
    Buyer: 3,
  };
const NavigationItems=[
    {
        name:'Users',
        route:'/users',
        access:[Role.Admin]
    },
    {
        name:'Categories',
        route:'/category',
        access:[Role.Admin]
    },
    {
        name:'Books',
        route:'/books',
        access:[Role.Seller,Role.Admin]
    },
    {
        name:'Update Profile',
        route:'/update-profile',
        access:[Role.Seller,Role.Buyer,Role.Admin]
    }
];

const hasAccess=(pathname,user)=>{
    const navItem=NavigationItems.find((navItem)=>{
        return navItem.route.includes(pathname);
    })

    if(navItem)
    {
        return (
            !navItem.access ||
            !!(navItem.access && navItem.access.includes(user))
        )
    }
    return true;
}

const LocalStorageKeys = {
    USER: "user",
};

export {
    NavigationItems,
    LocalStorageKeys,
    hasAccess
};