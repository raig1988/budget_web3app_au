// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @custom:security-contact rodri.iglesiasg@gmail.com
contract BudgetWeb3 is Initializable, ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC20_init("BudgetWeb3", "BGT");
        __Ownable_init();
        __UUPSUpgradeable_init();

        _mint(msg.sender, 200000000 * 10 ** decimals());
    }

    // function mint(uint256 amount) public {
    //     uint totalSupply = totalSupply();
    //     require(totalSupply + amount <= (1000000000 * 10 ** 18), "Max supply is 1 billion");
    //     _mint(msg.sender, amount);
    // }

    function mintBudget() public {
        uint totalSupply = totalSupply();
        uint amount = 20 * 10 ** 18;
        require(totalSupply + amount <= (1000000000 * 10 ** 18), "Max supply is 1 billion");
        _mint(msg.sender, amount);
    }

    function mintExpense() public {
        uint totalSupply = totalSupply();
        uint amount = 10 * 10 ** 18;
        require(totalSupply + amount <= (1000000000 * 10 ** 18), "Max supply is 1 billion");
        _mint(msg.sender, amount);
    }


    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}



// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// /// @custom:security-contact rodri.iglesiasg@gmail.com
// contract BudgetWeb3 is Initializable, ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
//     /// @custom:oz-upgrades-unsafe-allow constructor
//     constructor() {
//         _disableInitializers();
//     }

//     function initialize() initializer public {
//         __ERC20_init("BudgetWeb3", "BGT");
//         __Ownable_init();
//         __UUPSUpgradeable_init();

//         _mint(msg.sender, 1000000000 * 10 ** decimals());
//     }

//     function _authorizeUpgrade(address newImplementation)
//         internal
//         onlyOwner
//         override
//     {}
// }
