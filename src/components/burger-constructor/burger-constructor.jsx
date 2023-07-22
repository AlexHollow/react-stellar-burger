import React, { useState } from "react";
import styles from "./burger-constructor.module.css";

import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructor(props) {

  const ingredients = props.data;

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <div className={styles.container}>
        {
          ingredients.map((item) => {
            if (item.type === "bun") {
              return (
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                  extraClass="ml-8"
                  key={item._id}
                />
              )
            }
          })
        }

        <ul className={`${styles.list} custom-scroll`}>
          {
            ingredients.map((item) => {
              if (item.type !== 'bun') {
                return (
                  <li key={item._id} className={styles.listItem}>
                    <DragIcon />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </li>
                )
              }
            })
          }
        </ul>

        {
          ingredients.map((item) => {
            if (item.type === "bun") {
              return (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                  extraClass="ml-8"
                  key={item._id}
                />
              )
            }
          })
        }
      </div>

      <div className={`${styles.totalContainer} pr-4`}>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">0</span>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}