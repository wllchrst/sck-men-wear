import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import website from "../../assets/website.png";
import service from "../../assets/cs.png";
import quality from "../../assets/highquality.png";
import amang from "../../assets/amang.png";
import lowPrice from "../../assets/lowprice.png";

export default function WhyChooseUs() {
  const variants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2, // Adjust the duration as needed
        ease: "easeInOut",
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2, // Adjust the duration as needed
        ease: "easeInOut",
      },
    },
  };

  const leftToRight = {
    hidden: { x: "-100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2, // Adjust the duration as needed
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box className="flex flex-col">
      <div className="flex flex-col gap-1 p-10 mt-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headingVariants}
          className="flex justify-center items-center mb-24"
        >
          <Heading>Kenapa HARUS Memilih Kita</Heading>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="flex flex-col gap-10 px-32"
        >
          <div className="flex items-center gap-10">
            <Image src={website} />
            <Heading>KAMI Memiliki WEB RESMI</Heading>
          </div>
          <Text fontSize={"x-large"}>
            Kami memiliki website resmi yang memastikan kepada ANDA bahwa kami
            bukan agen Distributor Pakaian Dalam, Kaos Kaki, Sarung Tangan, Jas
            Hujan, Handuk, Payung, Kebutuhan Rumah Tangga dengan asal. Website
            resmi kami tentunya sudah legal dan bisa dipercaya dan pastinya
            website yang kami miliki juga sudah berbadan hukum dan bisa
            dipertanggungjawabkan.
          </Text>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftToRight}
          className="flex flex-col gap-10 px-32"
        >
          <div className="flex justify-end items-center gap-10">
            <Heading>Kami Memiliki Customer Service RESPONSIVE</Heading>
            <Image src={service} />
          </div>

          <Text fontSize={"x-large"} textAlign={"right"}>
            Layanan serta kontak customer service yang responsive sangat penting
            untuk memudahakan berkomunikasi antara konsumen dan produsen. Kami
            menyediakan customer service yang siap setiap hari dalam 24 jam
            untuk selalu terhubung dengan calon konsumen mulai awal chat – deal
            order – pembuatan – sampai dengan pengiriman kaos kaki.
          </Text>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="flex flex-col gap-10 px-32 mt-16"
        >
          <div className="flex items-center gap-10">
            <Image src={quality} />
            <Heading>Kualitas Hasil Produksi TERJAMIN!</Heading>
          </div>
          <Text fontSize={"x-large"}>
            Jaminan kepuasan merupakan hal yang kami utamakan. Kami menawarkan
            kualitas produk, kualitas dan harga DIJAMIN akan sesuai dengan apa
            yang telah anda pesan.
          </Text>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftToRight}
          className="flex flex-col gap-10 px-32 mt-16"
        >
          <div className="flex justify-end items-center gap-10">
            <Heading>JAMINAN Barang Sampai Ke Tujuan</Heading>
            <Image src={amang} />
          </div>

          <Text fontSize={"x-large"} textAlign={"right"}>
            Legalitas website dan juga perusahaan yang kami dirikan, customer
            service yang siap melayani anda non stop. Kualitas, pelayanan dan
            produk kami PASTIKAN sampai sesuai dengan waktu yang telah
            disepakati dan alamat yang telah anda kirimkan.
          </Text>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="flex flex-col gap-10 px-32 mt-16"
        >
          <div className="flex items-center gap-10">
            <Image src={lowPrice} />
            <Heading>Penawaran Harga Produk Terbaik</Heading>
          </div>
          <Text fontSize={"x-large"}>
            KAMI memberikan harga terbaik dibandingkan dengan kompetitor
            lainnya. ANDA dapat membandingkan penawaran kami dengan agen/
            distributor lainnya. Dengan mutu produk yang berkualitas dan harga
            yang sesuai tentu akan sangat MENGUNTUNGKAN untuk anda.
          </Text>
        </motion.div>
      </div>
    </Box>
  );
}
