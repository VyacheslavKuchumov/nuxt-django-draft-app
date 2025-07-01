-- CreateTable
CREATE TABLE "Customers" (
    "customer_id" BIGSERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "order_id" BIGSERIAL NOT NULL,
    "order_date" DATE NOT NULL,
    "customer_id" BIGINT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrdersProducts" (
    "order_id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "product_quantity" SMALLINT NOT NULL,

    CONSTRAINT "OrdersProducts_pkey" PRIMARY KEY ("order_id","product_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" BIGSERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "markup_percent" SMALLINT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrdersProducts_order_id_product_id_key" ON "OrdersProducts"("order_id", "product_id");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("customer_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OrdersProducts" ADD CONSTRAINT "OrdersProducts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersProducts" ADD CONSTRAINT "OrdersProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
