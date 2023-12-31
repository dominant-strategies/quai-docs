---
title: OpenCL
description: How to install and run an OpenCL Quai Network GPU miner on Ubuntu.
sidebar_position: 1
keywords:
  - ubuntu
  - mining
  - manual
  - opencl
---

# Ubuntu Installation: OpenCL

:::warning
You must have an instance of the [quai stratum proxy](/participate/stratum-proxy/run-stratum.md) before running a GPU miner.
:::

:::warning
Running a GPU miner on an Ubuntu based Virtual Machine may not work properly as the VM has no access to the GPU on your native OS. This includes most VMs that run on top of Windows or WSL2.
:::

## Introduction

Here, we'll be installing quai-gpu-miner, the main implementation of a **Quai Network GPU miner**. This tutorial focuses on installing and running **quai-gpu-miner on** [Ubuntu](https://ubuntu.com/), an enterprise and open source Linux distribution.

:::danger
If you are mining for Testnet Rewards, be sure to **KEEP THE PRIVATE KEYS OF THE ACCOUNTS YOU MINE INTO**. Signing transactions from the accounts you mine into (using their private keys) will be the only acceptable way to prove how many blocks you mined in the Iron Age Testnet when it is time to claim Mainnet rewards.
:::

### Requirements

In order to run the quai-gpu-miner on Ubuntu 20.04 and mine valid blocks, you'll need the following:

- [A synced go-quai node](/participate/node/run-a-node.md)
- [A stratum proxy connected to your go-quai node](/participate/stratum-proxy/run-stratum.md)
- A machine running Ubuntu 20.04 with:
  - At least one AMD or Nvidia GPU
  - An AMD or Intel CPU
  - 4GB+ of RAM

### Common Troubleshooting Resources

- [How to find the IP of a Stratum Proxy](/participate/stratum-proxy/stratum-faq.md#stratum-ip-address)
- ["No usable mining devices found" error](/participate/mining/gpu-miner/gpu-miner-faq.md#no-opencl-platforms-found--no-usable-mining-devices)
- ["SIGSEGV encountered" error](/participate/mining/gpu-miner/gpu-miner-faq.md#sigsegv)
- [Low hashrate on AMD cards](/participate/mining/gpu-miner/gpu-miner-faq.md#amd-low-hashrate)
- [Error on make and/or build step](/participate/mining/gpu-miner/gpu-miner-faq.md#error-on-make-andor-build)

Additional troubleshooting resources are available in the [GPU Miner FAQ](/participate/mining/gpu-miner/gpu-miner-faq.md).

## Environment Setup

### Ubuntu

To run the quai-gpu-miner, you'll first need to install and configure Ubuntu v20.04. The quai-gpu-miner **is not compatible for compilation with Ubuntu v22 or higher**. Instructions on how to download and install Ubuntu on your machine can be found on the [Ubuntu installation instructions](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview).

Compatible Version Download:

- [Ubuntu v20.04](https://releases.ubuntu.com/20.04/)

:::warning
If you'd like to run the GPU miner on Ubuntu v22.04, you'll need to compile the binaries on Ubuntu v20.04 first and run them on the newer version OS.
:::

Once you've installed and configured Ubuntu on your machine, open the terminal.

### Dependencies

Prior to installing any dependencies, you'll first want to make sure Ubuntu is up to date. We can do this by running:

```bash
sudo apt update && sudo apt upgrade -y
```

After Ubuntu has updated, we can begin installing the following dependencies:

- `git`
- `cmake`
- `build-essential`
- `mesa-common-dev`
- `nvidia-driver-535`

Install all dependencies using the following command:

```bash
sudo apt install -y git cmake build-essential mesa-common-dev nvidia-driver-535
```

After installing dependencies, reboot your machine to ensure all updates are applied correctly.

```bash
sudo reboot
```

## Configure and Run

Now that the **environment and dependencies** are fully configured, we can start installing `quai-gpu-miner`.

To install the miner, open up the terminal, clone the `quai-gpu-miner` repository, and navigate to the `quai-gpu-miner` directory:

```bash
git clone https://github.com/dominant-strategies/quai-gpu-miner && cd quai-gpu-miner
```

To install and update external repository dependencies, run the following:

```bash
git submodule update --init --recursive
```

This will ensure that all the submodules referenced in the repository are **properly initialized** and **up to date**.

### Build

Start by making a directory named `build` and navigating to it:

```bash
mkdir build && cd build
```

Inside of the build directory, we'll need to install all of the build dependencies using `cmake` and then build and compile the miner.

```bash
cmake .. && cmake --build .
```

:::info
Running this command may take a while to complete.
:::

### Run

To run the miner, you'll need a quai-stratum-proxy to connect to. Visit the [quai-stratum-proxy](/participate/stratum-proxy/run-stratum.md) docs for information on how to install and configure it. The proxy configuration will determine which shard your gpu-miner is running on and the address payouts are awarded to.

First, you'll need to [obtain the IP Address](/participate/stratum-proxy/stratum-faq.md#stratum-ip-address) and port your proxy is running on. The default port is `3333`.

Once you have the address and port and are in the `build` directory, run the following command to start the miner:

:::info
Replace `PROXYIPADDRESS` with the IP address of your proxy. Replace `STRATUMPORT` with the websocket port of your proxy, which is [default set to `3333`](/participate/stratum-proxy/stratum-faq.md#stratum-port)
:::

```bash
./ethcoreminer/ethcoreminer -G -P stratum://PROXYIPADDRESS:STRATUMPORT
```

The quai-gpu-miner should now be running and outputting logs to the terminal. Now that your miner is running, [learn how to optimize your miner in the FAQ](/participate/mining/gpu-miner/gpu-miner-faq.md#optimization)!

:::danger
Do not start the miner prior to confirming your node has [fully synced](/participate/node/node-faq.md#check-sync-status). Mining while your node is not synced will result in the mining of **invalid blocks** and **wasted hash**.
:::

### Stop

To stop the miner, simple use **CTRL+C** to kill the terminal process. Once logs are no longer being outputted to the terminal, the miner has stopped.
