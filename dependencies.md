```mermaid
graph TD;
    App[App Module] --> OrderModule[Order Module]
    App --> EmployeeModule[Employee Module]
    App --> PizzaModule[Pizza Module]
    App --> ToppingModule[Topping Module]
    App --> SizeModule[Size Module]
    App --> SauceModule[Sauce Module]
    App --> CheeseModule[Cheese Module]

    OrderModule --> OrderEmployeeModule[OrderEmployee Module]
    OrderModule --> OrderPizzaModule[OrderPizza Module]
    
    PizzaModule --> PizzaToppingModule[PizzaTopping Module]
    PizzaModule --> SizeModule
    PizzaModule --> SauceModule
    PizzaModule --> CheeseModule

    PizzaToppingModule --> ToppingModule

    OrderEmployeeModule --> EmployeeModule