#!/usr/bin/env python3
from typing import Final
from pyteal import abi, TealType, Global, Int, Seq
from beaker import Application
from beaker.state import ApplicationStateValue
from beaker.decorators import external, create, Authorize

class CounterApp(Application):

  counter: Final[ApplicationStateValue] = ApplicationStateValue(
  stack_type=TealType.uint64,
  descr="A counter for showing how to use application state",
  )


  @create
  def create(self):
      return self.initialize_application_state()

  @external(authorize=Authorize.only(Global.creator_address()))
  def increment(self, amount: abi.Uint64, *, output: abi.Uint64):
      """increment the counter"""
      return Seq(
          self.counter.set(self.counter + Int(amount)),
          output.set(self.counter),
      )

  @external(authorize=Authorize.only(Global.creator_address()))
  def decrement(self, amount: abi.Uint64, *, output: abi.Uint64):
      """decrement the counter"""
      return Seq(
          self.counter.set(self.counter - Int(amount)),
          output.set(self.counter),
      )


if __name__ == "__main__":
  CounterApp().dump("artifacts")