import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";

function testFormGroupTyped() {
  var frm = new FormGroup({
    a: new FormArray([new FormControl(0)]),
    b: new FormControl(true),
    c: new FormGroup({
      s: new FormControl("abc"),
      n: new FormControl(123)
    })
    //d: new FormControl(null)
  }) as FormGroupTyped<{ a: number[]; b: boolean; c: { s: string; n: number } /*; d?: {}*/ }>;
  frm.status;
  var x = frm.controls["a"].value; //OK infer number[]
  var y = frm.controls.b.value; //OK infer boolean
  frm.controls["c"].valueChanges.subscribe(z => console.log(z)); //OK infer {s: string, n:number}
  var c = frm.get("c").value; //OK infer {s: string, n:number}
  var s = frm.get(["c", "s"]).value; //OK infer unknown (Q: any is BETTER?!)
  var u = frm.get("u").value; //OK infer unknow (Q: any is BETTER?!)
  var r = frm.getRawValue(); //OK infer T + allow extra props
  var a = r.a; //OK infer number[]
  var d = r.d; //OK infer any
  var ok = frm.contains("a"); //OK infer boolean
  var ko = frm.contains("d"); //OK infer boolean -> true=enabled, false=disabled
  frm.setValue({ a: [1, 23], b: true, c: { s: "s", n: 1 } }); // OK
  frm.setValue({ b: false }, { onlySelf: true, emitEvent: false }); //ERROR -> setValue constraint to full T
  frm.patchValue({ b: true }, { onlySelf: true, emitEvent: false }); //OK -> patchValue accept Partial<T>
  frm.patchValue({ bb: true }, { onlySelf: true, emitEvent: false }); //ERROR -> not valid type Partial<T>
  frm.removeControl("a"); //OK with auto-complete "a"
  frm.removeControl("d"); //OK
  frm.registerControl("a", new FormControl(null));
  frm.registerControl("d", new FormControl(null)); //OK method with correct signature :-)
  frm.get("a").setValue([1, 2]); //OK - valid constranint check number[]
  frm.get("b").setValue("true"); //ERROR - invalid value boolean expected
  frm.get("d").setValue({ z: "xy" }); //OK - any evrything is a valid assignment
  var z: string = frm.get("d").value.z; //ERROR - but reading unknown force you to check before access
  frm.get("b").valueChanges.subscribe(b => console.log(b)); //OK - infer boolean correctly without cast
  frm.get("d").valueChanges.subscribe((u: { z: string }) => console.log(u.z)); //OK - explicit type cast to read from unknown
  frm.get("d").value; //OK infer unknow
  frm.get("d").disable({ emitEvent: false }); //OK method with correct signature :-)
  frm.removeControl("b"); //OK with auto-complete "b" :-)
  frm.removeControl("d"); //OK
  frm.setControl("b", testFormControlTyped()); //OK method with strict signature :-)
  frm.setControl("d", new FormControl(null)); //OK
  frm.addControl("b", testFormControlTyped()); //OK
  frm.addControl("a", testFormControlTyped()); //OK even if ovverride types :-()
  frm.addControl("e", new FormControl(null)); //OK
  frm.get(["e"]).reset(null, { onlySelf: true }); //OK method with correct signature :-)
}

function testFormArrayTyped() {
  var arr = new FormArray([
    new FormGroup({
      s: new FormControl("abc"),
      n: new FormControl(123)
    })
  ]) as FormArrayTyped<{ s: string; n: number }>;
  var x = arr.controls[0].value; //OK infer {s: string, n:number}
  var y = arr.at(1).value; //OK infer {s: string; n:number}
  arr.controls[0].valueChanges.subscribe(z => console.log(z)); //OK infer {s: string, n:number}
  arr.push(itemFormGroup()); //OK method with strict signature :-)
  arr.push(new FormControl(null)); //OK allowed by Angular -> infer AbstractControlTyped<any>
  arr.insert(0, itemFormGroup()); //OK method with strict signature :-)
  arr.setControl(2, new FormGroup({})); //OK allowed by Angular -> infer AbstractControlTyped<any>
  arr.setControl(1, itemFormGroup()); //OK method with strict signature :-)
  arr.removeAt(0); //OK
  var l = arr.length; //OK
  arr.setValue([{ s: "a", n: 1 }, { s: "b", n: 2 }]); //OK
  arr.setValue([{ s: "a", n: 1 }, { n: 2 }]); //ERROR -> setValue constraint to full T[]
  arr.patchValue([{ s: "a" }, { n: 2 }, {}]); //OK -> patchValue accept Partial<T>
  arr.patchValue([{ s: "a" }, { n: "NOP" }]); //ERROR -> not valid type Partial<T>
  arr.setValue([1, 23]); //ERROR -> invalid item type
  arr.setValue(1.23); //ERROR -> invalid type :-)
}

function testFormControlTyped() {
  var ctrl = new FormControl(true) as FormControlTyped<number>;
  var x = ctrl.value; //OK infer boolean
  ctrl.valueChanges.subscribe(z => console.log(z)); //infer boolean
  ctrl.setValue("abc"); //ERROR invalid type
  ctrl.patchValue(false); //OK correct type
  return ctrl;
}

function itemFormGroup() {
  var ctrl = new FormGroup({
    s: new FormControl("", Validators.required),
    n: new FormControl(0, [Validators.min(0), Validators.max(9)])
  });
  return ctrl as FormGroupTyped<{ s: string; n: number }>;
}
