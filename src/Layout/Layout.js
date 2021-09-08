"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
// @ts-nocheck
const react_1 = __importStar(require("react"));
const react_router_1 = require("react-router");
const useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
const react_google_login_1 = require("react-google-login");
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
const Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const styles_1 = require("@material-ui/core/styles");
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const ViewComfy_1 = __importDefault(require("@material-ui/icons/ViewComfy"));
const FilterBar_1 = __importDefault(require("../components/FilterBar/FilterBar"));
const RecipeSearchBar_1 = __importDefault(require("../components/RecipeSearchBar/RecipeSearchBar"));
const Styles_1 = __importDefault(require("./Styles"));
const Layout = ({ children, filteredTags, filterRecipes, categoryOptions, dietTagOptions, intoleranceOptions, searchRecipes, isSearching, isFiltered, emptySearch, recipeSearchText, clientId, handleSignIn, handleSignOut, isSignedIn, googleProfile, }) => {
    const [drawerOpen, setDrawerOpen] = react_1.useState(false);
    const [loginMenuOpen, setLoginMenuOpen] = react_1.useState(false);
    const classes = Styles_1.default();
    const history = react_router_1.useHistory();
    const location = react_router_1.useLocation();
    const theme = styles_1.useTheme();
    const lgDevice = useMediaQuery_1.default(theme.breakpoints.up('lg'));
    const mdDevice = useMediaQuery_1.default(theme.breakpoints.up('md'));
    const smDevice = useMediaQuery_1.default(theme.breakpoints.up('sm'));
    const handleLoginMenuOpen = (e) => {
        setLoginMenuOpen(e.currentTarget);
    };
    const handleLoginMenuClose = () => {
        setLoginMenuOpen(false);
    };
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    react_1.useEffect(() => {
        setLoginMenuOpen(false);
    }, [isSignedIn]);
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(AppBar_1.default, { className: classes.appbar, elevation: 0 },
            react_1.default.createElement(Toolbar_1.default, { className: classes.toolbar },
                react_1.default.createElement(Button_1.default, { className: classes.navBtn, variant: "contained", onClick: () => history.push('/'), endIcon: react_1.default.createElement(ViewComfy_1.default, null), color: history.location.pathname === '/' ? 'secondary' : 'default' }, smDevice ? 'View Recipes' : 'Recipes'),
                react_1.default.createElement(Button_1.default, { className: classes.navBtn, variant: "contained", onClick: () => history.push('/create'), endIcon: react_1.default.createElement(Add_1.default, null), color: history.location.pathname === '/create' ? 'secondary' : 'default' }, smDevice ? 'Create New' : 'Create'),
                location.pathname === '/' && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Divider_1.default, { className: classes.divider, orientation: "vertical" }),
                    mdDevice && (react_1.default.createElement(RecipeSearchBar_1.default, { filterRecipes: filterRecipes, handleSearch: searchRecipes, isSearching: isSearching, emptySearch: emptySearch, recipeSearchText: recipeSearchText })),
                    lgDevice ? (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(FilterBar_1.default, { options: categoryOptions, filteredTags: filteredTags, filterRecipes: filterRecipes, tagTitle: "Category", tagGroup: "categories" }),
                        react_1.default.createElement(FilterBar_1.default, { options: dietTagOptions, filteredTags: filteredTags, filterRecipes: filterRecipes, tagTitle: "Diet", tagGroup: "dietTags" }),
                        react_1.default.createElement(FilterBar_1.default, { options: intoleranceOptions, filteredTags: filteredTags, filterRecipes: filterRecipes, tagTitle: "Intolerance", tagGroup: "intolerances" }))) : (react_1.default.createElement(Button_1.default, { className: classes.filterBtn, onClick: handleDrawerOpen, variant: "contained", color: isSearching || isFiltered ? 'secondary' : 'default' }, "Filters")))),
                react_1.default.createElement(IconButton_1.default, { onClick: handleLoginMenuOpen, className: classes.avatarIconBtn }, isSignedIn ? (react_1.default.createElement(Avatar_1.default, { alt: "avatar", src: isSignedIn ? googleProfile.imageUrl : '' })) : (react_1.default.createElement(react_google_login_1.GoogleLogin, { cookiePolicy: "single_host_origin", isSignedIn: true, clientId: clientId, onSuccess: (response) => handleSignIn(response), onFailure: (response) => console.log(response), render: (renderProps) => react_1.default.createElement(Avatar_1.default, { onClick: renderProps.onClick }) }))))),
        react_1.default.createElement(Drawer_1.default, { color: "primary", open: drawerOpen, onClose: handleDrawerClose, anchor: "top" },
            react_1.default.createElement(Toolbar_1.default, { className: classes.drawer },
                !mdDevice && (react_1.default.createElement(RecipeSearchBar_1.default, { filterRecipes: filterRecipes, handleSearch: searchRecipes, isSearching: isSearching, emptySearch: emptySearch, recipeSearchText: recipeSearchText })),
                react_1.default.createElement(FilterBar_1.default, { className: classes.drawerFilterBtn, options: categoryOptions, filteredTags: filteredTags, filterRecipes: filterRecipes, tagTitle: "Category", tagGroup: "categories" }),
                react_1.default.createElement(FilterBar_1.default, { className: classes.drawerFilterBtn, options: dietTagOptions, filteredTags: filteredTags, filterRecipes: filterRecipes, tagTitle: "Diet", tagGroup: "dietTags" }),
                react_1.default.createElement(FilterBar_1.default, { className: classes.drawerFilterBtn, options: intoleranceOptions, filteredTags: filteredTags, filterRecipes: filterRecipes, tagTitle: "Intolerance", tagGroup: "intolerances" }))),
        react_1.default.createElement(Menu_1.default, { anchorEl: loginMenuOpen, open: Boolean(loginMenuOpen), onClose: handleLoginMenuClose },
            react_1.default.createElement("div", null, isSignedIn ? (react_1.default.createElement(react_google_login_1.GoogleLogout, { clientId: clientId, onLogoutSuccess: handleSignOut })) : (react_1.default.createElement(react_google_login_1.GoogleLogin, { className: classes.googleLogin, cookiePolicy: "single_host_origin", isSignedIn: true, clientId: clientId, onSuccess: handleSignIn })))),
        react_1.default.createElement("div", { className: classes.page },
            react_1.default.createElement("div", { className: classes.toolbar }),
            children)));
};
exports.default = Layout;
