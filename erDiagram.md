```mermaid
erDiagram

Employee ||--o{ OrderEmployee : assigned_to
Order    ||--o{ OrderEmployee : includes

Order    ||--o{ OrderPizza    : includes
Pizza    ||--o{ OrderPizza    : part_of

Pizza    ||--o{ PizzaTopping  : has
Topping  ||--o{ PizzaTopping  : used_on

Pizza    }o--|| Size          : has_size
Pizza    }o--|| Sauce         : has_sauce
Pizza    }o--|| Cheese        : has_cheese

Employee {
    int id pk
    varchar name
    varchar email
    date hireDate
}

Order {
    int id pk
    int tableNumber_nullable
    boolean delivery
    varchar address_nullable
    boolean takeaway
    float tip
    date dateTimePlaced
    date dateTimeFulfilled
}

OrderEmployee {
    int id pk
    int orderId fk
    int employeeId fk
    varchar role  
}

Pizza {
    int id pk
    int sizeId fk
    int sauceId fk
    int cheeseId fk
}

OrderPizza {
    int id pk
    int orderId fk
    int pizzaId fk
}

PizzaTopping {
    int id pk
    int pizzaId fk
    int toppingId fk
}

Size {
    int id pk
    varchar name
    int size
    float cost
}

Topping {
    int id pk
    varchar ingredient
    float cost
}

Sauce {
    int id pk
    varchar type
}

Cheese {
    int id pk
    varchar type
}