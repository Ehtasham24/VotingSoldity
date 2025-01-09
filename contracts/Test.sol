// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WholesalerRetailer {
    // Struct to represent a product
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address owner; // Current owner of the product
        bool isSold;   // Tracks if the product is sold
    }

    // Events
    event ProductAdded(uint256 productId, string name, uint256 price, address addedBy);
    event ProductPurchased(uint256 productId, address purchasedBy);

    // State variables
    address public wholesaler;
    uint256 public productCounter = 0;
    mapping(uint256 => Product) public products; // productId => Product details

    // Access control: retailer registration
    mapping(address => bool) public registeredRetailers;

    // Modifiers
    modifier onlyWholesaler() {
        require(msg.sender == wholesaler, "Only wholesaler can perform this action");
        _;
    }

    modifier onlyRegisteredRetailer() {
        require(registeredRetailers[msg.sender], "Only registered retailers can perform this action");
        _;
    }

    modifier productExists(uint256 _productId) {
        require(products[_productId].id == _productId, "Product does not exist");
        _;
    }

    modifier notSold(uint256 _productId) {
        require(!products[_productId].isSold, "Product already sold");
        _;
    }

    // Constructor to initialize wholesaler
    constructor() {
        wholesaler = msg.sender; // Deploying address is the wholesaler
    }

    // Wholesaler adds a product to the supply chain
    function addProduct(string memory _name, uint256 _price) public onlyWholesaler {
        productCounter++;
        products[productCounter] = Product({
            id: productCounter,
            name: _name,
            price: _price,
            owner: wholesaler,
            isSold: false
        });
        emit ProductAdded(productCounter, _name, _price, msg.sender);
    }

    // Wholesaler registers a retailer
    function registerRetailer(address _retailer) public onlyWholesaler {
        require(_retailer != address(0), "Invalid address");
        registeredRetailers[_retailer] = true;
    }

    // Retailer purchases a product
    function purchaseProduct(uint256 _productId) 
        public 
        payable 
        onlyRegisteredRetailer 
        productExists(_productId) 
        notSold(_productId) 
    {
        Product storage product = products[_productId];

        // Ensure the sent value matches the product price
        require(msg.value >= product.price, "Insufficient payment");

        // Transfer ownership to the retailer
        product.owner = msg.sender;
        product.isSold = true;

        // Transfer payment to the wholesaler
        payable(wholesaler).transfer(product.price);

        emit ProductPurchased(_productId, msg.sender);
    }

    // View details of a product
    function getProduct(uint256 _productId) 
        public 
        view 
        productExists(_productId) 
        returns (string memory, uint256, address, bool) 
    {
        Product memory product = products[_productId];
        return (product.name, product.price, product.owner, product.isSold);
    }

    // Check if an address is a registered retailer
    function isRegisteredRetailer(address _retailer) public view returns (bool) {
        return registeredRetailers[_retailer];
    }
}
